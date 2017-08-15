
import { routerRedux } from 'dva/router';
import { saveDelivery } from '../../services/user';
import pathToRegexp from 'path-to-regexp';
import { outOfDeliveryRange } from '../../utils/price'
import { Toast } from 'antd-mobile';

export default {
  namespace: 'AddressPage',

  state: {
    ui:{
      phoneHasError: false,
      showModal: false,
    },
    delivery:{
      id: null,
      name:null,
      phone:null,
      address:null,
      city:null,
      location:null,
      lat:null,
      lng:null
    }
  },

  subscriptions: {
    
  },

  effects: {
    *componentWillMount({payload},{call,select,put}){
      const {user} = yield select(state => state)
      let delivery = {}
      if(user.delivery)
        delivery = {...user.delivery}

      if(payload.latng){
        const loc = payload.latng.split(',')
        const lat = parseFloat(loc[0])
        const lng = parseFloat(loc[1])

        if( outOfDeliveryRange(lat,lng) || 
            payload.city != "长沙市" ||
            payload.addr == ""){
          //选择的地址无效
          yield put({type:'updateModal', payload:true})
        }else{
          //更新地址
          delivery = {
            ...delivery,
            city: payload.city,
            location: payload.name,
            address: `${payload.city} ${payload.addr} ${payload.name} `,
            lat: lat,
            lng: lng,
          }
          yield put({type:'updateDelivery', payload: delivery})
        }
      }else{
        yield put({type:'updateDelivery', payload: delivery})
      }


    },

    *saveDelivery({payload},{call,select,put}){
      const model = yield(select(state => state.AddressPage))

      const {id, name, address, lat, lng, phone} = model.delivery
      const {phoneHasError} = model.ui
      
      if(!address || address=='' || !lat || !lng){
        Toast.info('请在地图中选取收货地址')
        return
      }
      if(!name || name==''){
        Toast.info('请输入联系人称呼')
        return
      }
      if(!phone || phone=='' || phoneHasError){
        Toast.info('请输入11位联系人手机');
        return
      }

      const { response, err } = yield call(saveDelivery, model.delivery)
      if(err || !response || !response.ok || !response.payload){
        console.error('save delivery failed: ')
        console.error(err)
        console.error(response)
        return
      }
      
      console.log(`save delivery  succeeded with payload: ${response.payload}`)

      //update data
      model.delivery.id = response.payload.id
      yield put({ type: 'user/updateDelivery', payload: model.delivery })

      //get backUrl
      let destination = window.sessionStorage.getItem('address_page_return')
      if(!destination)
        destination = '/shop/home'
      yield put(routerRedux.push(destination))
    },
  },

  reducers: {
    updateDelivery(state, action){
      return {
        ...state,
        delivery:{...state.delivery, ...action.payload}
      }
    },

    updateUI(state,action){
      return {
        ...state,
        ui: {...state.ui, ...action.payload}
      }
    }

  },

};
