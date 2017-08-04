import React, { Component } from 'react';
import { Link } from 'react-router';

import { Carousel, ActivityIndicator } from 'antd-mobile';

import fetchData from '../../../../until/fetchData';
import { indexBannerSize, indexbannerUrl } from '../../../../config/index';

import './index.less';

// let BannerItem = ( ) =>(

// )

class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadinig: true,
      data: [],
      show: true,
    };
  }
  render() {
    const { data, loadinig, show } = this.state;
    const winW = window.document.body.offsetWidth;
    const style = {
      height: `${indexBannerSize.height * winW / indexBannerSize.width}px`,
    };
    return (
      <div>
        {
          show
            ? <div className="index_banner" style={style}>
              {
                loadinig
                  ? <ActivityIndicator text="正在加载" />
                  : data.length > 1
                    ? <Carousel
                      infinite
                      autoplay
                    >
                      {
                        data.map(({ src, img, _id }, idx) => (
                          <Link to={`/detail/${_id}`} href={src} key={idx} className="index_banner_item" >
                            <img src={img} style={style} />
                          </Link>
                        ))
                      }
                    </Carousel>
                    : data.map(({ src, img, _id }, idx) => (
                      <Link to={`/detail/${_id}`} href={src} key={idx} className="index_banner_item" >
                        <img src={img} />
                      </Link>
                    ))

              }
            </div>
            : null
        }
      </div>

    );
  }
  componentDidMount() {
    fetchData(indexbannerUrl)
      .then((_data) => {
        // console.log(res);
        if (_data.isOk && _data.data.length !== 0) {
          this.setState({
            loadinig: false,
            data: _data.data,
          });
        } else {
          this.setState({
            show: false,
          });
        }
      });
  }
}


export default Banner;
