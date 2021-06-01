/**
 * 图片展示、删除
 */
import React, { Component } from 'react';
import { Upload, Modal } from 'antd';

class ImageShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '111',
        }
    }

    handlePreview = async file => {
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    render() {
        const { fileList } = this.props;
        const { previewVisible, previewTitle, previewImage } = this.state;
        return(<div>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                // showUploadList={{showRemoveIcon: false}}
                onChange={() => {console.log('--------', fileList); this.props.onFileChange(fileList)}}
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
            </div>
        </div>)
    }
}
export default ImageShow;