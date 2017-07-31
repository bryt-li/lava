
import { routerRedux } from 'dva/router';
import { saveDelivery } from '../services/user';
import pathToRegexp from 'path-to-regexp';
import { outOfDeliveryRange } from '../utils/price'

export default {
  namespace: 'address',

  state: {
    showModal: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname, search, query}) => {
        const match = pathToRegexp('/address').exec(pathname);
        console.log(search)
        console.log(query)
        if (match && query.latng) {
          const loc = query.latng.split(',')
          const lat = parseFloat(loc[0])
          const lng = parseFloat(loc[1])

          if( outOfDeliveryRange(lat,lng) || 
              query.city != "长沙市" ||
              query.addr == ""){
            //选择的地址无效
            dispatch({type:'updateModel', payload:true})
          }else{
            //更新地址
            const payload = {
              city: query.city,
              location: query.addr,
              address: `${query.city} ${query.addr} ${query.name} `,
              lat: lat,
              lng: lng,
            }
            dispatch({type:'user/updateDelivery', payload: payload})
          }
        }
      });  
    },
  },

  effects: {

    *saveDelivery({payload},{call,select,put}){
      const {delivery, destination} = payload

      const user = yield(select(state => state.user))
      if(!user || !user.id){
        console.error('no user signed in.')
        return
      }

      //if user signed in, save to remote
      const { response, err } = yield call(saveDelivery, delivery)
      if(err || !response || !response.ok || !response.payload){
        console.error('save delivery failed: ')
        console.error(err)
        console.error(response)
        return
      }
      
      console.log(`save delivery  succeeded with payload: ${response.payload}`)

      //update data
      yield put({ type: 'user/updateDelivery', payload: delivery })

      //get backUrl
      yield put(routerRedux.push(destination))
    },
  },

  reducers: {
    updateModel(state,action){
      return {
        showModal: action.payload
      }
    }
  },

};
