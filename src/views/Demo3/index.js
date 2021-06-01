import React, { Component } from 'react';
import './index.scss';
import * as util from '../../assets/js/utils.js';
// import { Upload, Modal } from 'antd';
import ImageShow from './components/ImageShow';

class Demo3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [
                {id: "1", rank: 1},
                {id: "2", rank: 1,
                    children: [
                        {id: "2.1", rank: 2},
                        {id: "2.2", rank: 2}
                    ]
                },
                {id: "3", rank: 1,
                    children: [
                        {id: "3.1", rank: 2,
                            children: [
                                {id: "3.1.1", rank: 3},
                                {id: "3.1.2", rank: 3}
                            ]
                        }
                    ]
                },
            ],
            brr: [],
            previewVisible: false,
            previewImage: '',
            previewTitle: '111',
            fileList: [
                {
                    uid: '1',
                    name: '食物',
                    url: 'http://p2.ssl.cdn.btime.com/t01561fc7827a8162a7.jpg',
                },
                {
                    uid: '2',
                    name: '美女',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '3',
                    name: '可爱',
                    url: 'http://img10.360buyimg.com/n1/s350x449_jfs/t22885/10/2298886005/72134/d028a423/5b7b6ce7N44d35caf.jpg%21cc_350x449.jpg',
                },
                {
                    uid: '4',
                    name: '可爱',
                    url: 'http://gi3.md.alicdn.com/bao/uploaded/i3/T1LifKXldiXXanarU9_102553.jpg',
                },
            ],
        }
    }

    componentDidMount() {
        const { arr } = this.state;
        let brrCopy = [];
        for(let i in arr) {
            if(arr[i].children) {
                for(let j in arr[i].children) {
                    if(arr[i].children[j].children) {
                        for(let k in arr[i].children[j].children) {
                            if(arr[i].children[j].children[k].children) {
                                console.log("k");
                            } else {
                                brrCopy.push({
                                    id: arr[i].id,
                                    rank: arr[i].rank,
                                    id1: arr[i].children[j].id,
                                    rank1: arr[i].children[j].rank,
                                    id2: arr[i].children[j].children[k].id,
                                    rank2: arr[i].children[j].children[k].rank
                                });
                            }
                        }
                    } else {
                        brrCopy.push({
                            id: arr[i].id,
                            rank: arr[i].rank,
                            id1: arr[i].children[j].id,
                            rank1: arr[i].children[j].rank
                        });
                    }
                }
            } else {
                brrCopy.push(arr[i]);
            }
        }
        this.setState({brr: brrCopy});
        console.log("========brr", brrCopy);
    }

    // handlePreview = async file => {
    //     // if (!file.url && !file.preview) {
    //     //     file.preview = await getBase64(file.originFileObj);
    //     // }
    
    //     this.setState({
    //         previewImage: file.url || file.preview,
    //         previewVisible: true,
    //         previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    //     });
    // };

    onFileChange = ({ fileList }) => {
        this.setState({ fileList });
        console.log('===========file', fileList);
    };

    render() {
        const { brr, fileList, 
            // previewVisible, previewTitle, previewImage
         } = this.state;
        return(
            <div className='demo3' style={{backgroundImage: `url(${util.waterMark('Liz')})`}}>
                {brr.map(index => {
                    return(<div className='demo3-content'>
                        {index.id}
                    </div>)
                })}
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="210">
                    <polygon points="100,10 40,200 190,80 10,80 160,200"
                    style={{fill:'pink',stroke:'lightblue',strokeWidth:5,fillRule:'evenodd'}} />
                </svg>
                {/* <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    // showUploadList={{showRemoveIcon: false}}
                    onChange={({ fileList }) => this.setState({ fileList })}
                >
                    {null}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={() => this.setState({ previewVisible: false })}
                >
                    <img alt="example" style={{ width: '100%', height: '100%' }} src={previewImage} />
                </Modal>
                <div style={{display: 'flex'}}>
                    {fileList&&fileList.map(index => {
                        return(<div key={index.uid} style={{width: 112, display: 'flex', justifyContent: 'center'}}>{index.name}</div>)
                    })}
                </div> */}
                <ImageShow
                    fileList={fileList}
                    onFileChange={this.onFileChange.bind(this, fileList)}
                />
            </div>
        )
    }
}
export default Demo3;