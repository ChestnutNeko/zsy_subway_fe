/**
 * 分页组件
 */
import React, { Component } from 'react';
import { Pagination } from 'antd';
import './index.css';

class PaginationUi extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    showTotal = totalNum =>{
        return `共${this.props.pages}页，${totalNum}条`;
    }

    // 选中N条/页后
    onShowSizeChange = (page, pageSize) => {
        let curFun = this.props.paginationOnChange;
        typeof curFun === 'function' && curFun(page, pageSize);
    }

    render() {
        const {
            totalNum, // 总条数
            pages, // 总页数
            page, // 当前页
            pageSize // 10 20 30 50
        } = this.props;
        return(
            totalNum !== 0 ?
            <Pagination
                size='small'
                className='pagination'
                current={page}
                total={pages}
                pageSize={pageSize}
                totalPage={totalNum}
                showSizeChanger 
                showQuickJumper
                showTotal={this.showTotal} 
                onShowSizeChange={this.onShowSizeChange}
                hideOnSinglePage={false}
                pageSizeOptions={['10', '20', '30', '50']}
                onChange={this.onShowSizeChange}
            /> : ''
        )
    }
}

export default PaginationUi;