import React,{ useEffect } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux'
import { getMenus, setUser, SetUserToken, setAllMenus, setSections,setTags } from '../redux/action'
import  axios  from '../axios'
import api from '../axios/api'
export default connect()(Form.create()(({form,dispatch}) => {

    useEffect( ()=>{
        
    },[])

     function submit (){
        form.validateFields( (err) => {
            
            if(!err){
               axios({method:'POST',url:api.Login,data:form.getFieldsValue()}).then( res=>{
                    dispatch(getMenus(res))
                    dispatch(setAllMenus(res))
                    localStorage.setItem('AS_MALL_ACCESS_TOKEN',res.TOKEN)
                    dispatch(SetUserToken(res.TOKEN))
                    dispatch(setUser(res.user))
                    window.location.href='/#/index'
                    http()
                })   
            }
        })   
    }

    function http(){
        //获取分类信息
        axios({url:api.getsection}).then((res) =>{
            dispatch(setSections(res))
        })
        // 获取标签数据
        axios({url:api.getTags}).then((res)=>{
            dispatch(setTags(res.tags))
        })
    }
    const { getFieldDecorator } =form;
    return <div className="login">
        {/* <img src="http://qiniu.xl686.com/tim-mossholder-fwqB5mJNOcE-unsplash.jpg" className="back-image" alt=""/> */}
        <div className="login-form">
            <div className="title">系统登录</div>
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('userName',{
                            initialValue:'youke',
                            rules:[
                                { required: true, message: 'Please input your username!' },
                                { min:5,max:10, message: '长度不在范围内' },
                                { pattern:/^\w+$/g,message:'用户名必须为字母或者数组'}
                            ]
                        })(
                            <Input size="large" prefix={<Icon type="user" />} placeholder="请输入用户名" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('passWord',{
                            initialValue:'123456',
                            rules:[
                                { required: true, message: 'Please input your password!' },
                                { min:5,max:10, message: '长度不在范围内' },
                                { pattern:/^\w+$/g,message:'用户名必须为字母或者数组'}
                            ]
                        })(
                            <Input.Password  size="large" prefix={<Icon type="lock" />} placeholder="请输密码" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={submit}>登录</Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}))