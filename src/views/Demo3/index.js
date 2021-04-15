import React, { Component } from 'react';
import './index.scss';
import * as util from '../../assets/js/utils.js';

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
            brr: []
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

    render() {
        const { brr } = this.state;
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
            </div>
        )
    }
}
export default Demo3;