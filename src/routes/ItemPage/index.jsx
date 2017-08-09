import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar } from 'antd-mobile';
import ReactLoading from 'react-loading';
import {Helmet} from "react-helmet";
import {findObj} from '../../utils';

import {formatMoney} from '../../utils/price';

import styles from './index.less';

class ItemPage extends React.Component{

	constructor (props) {
    	super(props)
	    this.state = {
		    imageLoading: true,
	    }
	}
	
	componentWillMount() {
	}

  	handleImageLoaded = () => {
  		this.setState({...this.state, imageLoading:false});
  	}

  	render(){
  		const {imageLoading} = this.state;
  		const {dispatch, params, catalog} = this.props;
  		const {type,id} = params;
  		const item = catalog[type][id];
  		
  		let seasoning = null;
  		let seasoning_id = null;
  		if(item.season){
  			let result = findObj(catalog['seasonings'],item.season);
  			if(result){
		  		seasoning = result.obj;
		  		seasoning_id = result.key;
		  	}
  		}

  		return(
		<div className={styles.container}>
			<Helmet>
                <meta charSet="utf-8" />
                <title>{item.name}</title>
            </Helmet>
		    <NavBar
		        leftContent="返回"
		        mode="light"
		        onLeftClick={() => this.props.dispatch(routerRedux.goBack())}
		        rightContent={[
		          <Icon key="0" type="search" style={{marginRight: '0.32rem'}} />,
		          <Icon key="1" type="ellipsis" />
		        ]}>
		      {item.name}
		    </NavBar>

			{imageLoading && <ReactLoading className={styles.loading} type='spinningBubbles' color='$444'/> }
			<Carousel
		      className={styles.carousel}
		      autoplay={true}
		      infinite
		      selectedIndex={0}
		      swipeSpeed={35}>
				<img alt="icon" src={`/menu/${type}/${id}/1.jpg`} />
				<img onLoad={this.handleImageLoaded} alt="icon" src={`/menu/${type}/${id}/2.jpg`} />
		    </Carousel>
    		<WingBlank size="sm">
			    <Flex className={styles.title}>
			    	<Flex.Item className={styles.name}>{item.name}</Flex.Item>
			    	<Flex.Item className={styles.price}><span className={styles.original_price}><span className={styles.cny}>&nbsp;&nbsp;￥</span>{formatMoney(item.original_price)}&nbsp;&nbsp;</span><span className={styles.cny}>￥</span>{formatMoney(item.price)}</Flex.Item>
			    </Flex>
			    <hr />
			    <div className={styles.order}>
		    		<div><span>沙拉标配</span>{`${item.season?item.season:'无酱汁'}(${item.rice?'小饭团':'无饭团'})`}</div>
		    		<div><span>配送时间</span>至少提前一天预订</div>
			    </div>
		    </WingBlank>
		   
		    <div className={styles.intro}>
		    	<h1><span>产品介绍</span></h1>
		    	<div><item.intro/></div>
		    </div>
		    <div className={styles.majors}>
		    	<h1><span>特色食材</span></h1>
		    	<p>以下为部分主要食材<br />百分比为表示总量使用比例。</p>
		    	<MajorIngredients majors={item.ingredients} ingredients={catalog.ingredients}/>
		    </div>

    		<WingBlank size="lg">
			    <div className={styles.ingredients}>
			    	<h1><span>配料</span></h1>
			    	<item.ingredients_intro/>
			    </div>
		    </WingBlank>

    		<WingBlank size="lg">
			    <div className={styles.nutrition}>
			    	<h1><span>营养价值</span></h1>
			    	<NutritionTable nutrition={item.nutrition}/>
			    </div>
		    </WingBlank>

		    {seasoning?
		    (<div className={styles.season}>
		    	<h1><span>酱汁</span></h1>
		    	<h2>{seasoning.name}</h2>
		    	<h3>{seasoning_id.toEnglish()}</h3>
		    	<h4>{seasoning.intro}</h4>
		    	<img src={`/menu/seasonings/${seasoning_id}.jpg`} />
		    	<MinorIngredients minors={seasoning.ingredients.split(',')}  ingredients={catalog.ingredients}/>

	    		<WingBlank size="lg">
				    <div className={styles.nutrition}>
				    	<h1><span>酱汁营养价值</span></h1>
				    	<NutritionTable nutrition={seasoning.nutrition}/>
				    </div>
			    </WingBlank>
			    {seasoning.extra?
			    (<div className={styles.season_extra}>
				    <seasoning.extra/>
			    </div>):null
				}
		    </div>):null
			}

			<WingBlank size="lg">
			    <div className={styles.delivery}>
			    	<h1><span>配送范围</span></h1>
			    	<img src="/res/delivery.jpg" />
			    	<p>西二环、北二环、东二环、南二环以内<br/>
			    	五一路、王府井、奥克斯商圈、以及麓谷地区</p>
			    	<h1><span>配送费用说明</span></h1>
			    	<p>3公里内提前一天预订免费配送</p>
			    	<p>当日订餐按每公里2.5元收取配送费</p>
			    </div>
		    </WingBlank>

		    <WingBlank size="lg">
			    <div className={styles.brand}>
			    	<h1><span>品牌特色</span></h1>
			    	<h2>饮食越简单，身体越轻盈</h2>
			    	<div className={styles.brandbox}>
				    	<div className={styles.brand3}>
				    		<h3>3S品质</h3>
				    		<p>精选Selected</p>
				    		<p>应季Seasonal</p>
				    		<p>无公害Safety</p>
				    	</div>
				    	<div className={styles.brand1}>
					    	<h3>1心为你</h3>
				    		<p>给你最好、最新鲜的食物</p>
				    	</div>
				    	<div className={styles.brand2}>
					    	<h3>2步加工</h3>
				    		<p>深度清洗</p>
				    		<p>极简加工</p>
				    	</div>
			    	</div>
			    </div>
		    </WingBlank>
	    	<div style={{clear:'both'}}></div>
		</div>
  		);
  	}
}

const MajorIngredients = ({majors, ingredients}) => {
	const data = Object.entries(majors).map((entry,key)=>{

		const name = entry[0];
		const percent = entry[1];
		const result = findObj(ingredients,name);
		const major = result.obj;
		const major_id = result.key;
		return{
			name:major.name,
			percent:percent,
			intro:major.intro,
			image:`/menu/ingredients/${major_id}.jpg`
		};
	});

	return (
		<WingBlank size="lg">
			<Flex wrap='wrap'>
				{data.map((major,i) => (
					<div key={i} className={styles.major}>
						<img src={major.image} />
						<div>
							<h2>{major.percent}</h2>
							<h3>{major.name}</h3>
							<h4>{major.intro}</h4>
						</div>
					</div>	
				))}
			</Flex>
		</WingBlank>
	);
}

const MinorIngredients = ({minors, ingredients}) => {
	const data = minors.map((name) => {
		const result = findObj(ingredients,name);
		const minor = result.obj;
		const minor_id = result.key;

		return {
			name: minor.name,
			image: `/menu/ingredients/${minor_id}.png`
		}
	});
	return (
		<WingBlank size="lg">
			<Grid data={data} columnNum={3} renderItem={i => (
		        <div className={styles.minor}>
					<img src={i.image} alt="icon" />
					<h3>{i.name}</h3>
		        </div>
      		)} />
		</WingBlank>
	);
}

const NutritionTable = ({nutrition}) => {
	return(
		<table><tbody>
			<tr>
				<th></th>
				<th>热量C</th>
				<th>碳水Cx</th>
				<th>脂肪Fat</th>
				<th>蛋白质Pro</th>
			</tr>
			<tr>
				<td><Icon type="koubei-o" /></td>
				<td>{nutrition['C']}<span>Kcal</span></td>
				<td>{nutrition['Cx']}<span>g</span></td>
				<td>{nutrition['Fat']}<span>g</span></td>
				<td>{nutrition['Pro']}<span>g</span></td>
			</tr>
		</tbody></table>
	);
}

ItemPage.propTypes = {
};

const mapStateToProps = (state) => ({
    catalog: state.menu.catalog,
});

export default connect(mapStateToProps)(ItemPage);
