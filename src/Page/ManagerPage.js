import React, { Component } from 'react'
import {Navbar, Nav,FormControl , Button,Form, Row,Container, Col} from 'react-bootstrap';
import Avatar from './../Components/Avatar';
import { FaSignOutAlt } from 'react-icons/fa';
import './../css/managerPage.css';
import Crawler from './ChilPage/Crawler';
import {FaSpider} from 'react-icons/fa'
import Modal from 'react-responsive-modal';
import BASE_URL from './../util/globalVar';
import axios from 'axios';
import './../css/login.css';
import Alert from './../Components/Alert';
import ReactLoading from 'react-loading';

export default class ManagerPage extends Component {

    state = {
        email : '',
        password : '',
        page : 'crawler',
        checkRole : false,
        modalShow : false,
        open : false,
        name : '',
        msg : '',
        isLoading : false
    }

    componentDidMount = async () => {
        let token = await localStorage.getItem('token');
        console.log(token)
        if(token)
        {

            if(token === 'admin')
            {
                this.setState({
                    checkRole : true
                })
            }
        }
    }
    onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };

      submitUSer = async () => {
        

        let test = await axios.get(`${BASE_URL}/api/users/signUp?email=${this.state.email}&password=${this.state.password}&name=${this.state.name}`);
        this.setState({isLoading : true});

        await setTimeout(()=>{
            this.setState({isLoading : false});
            if(test.data.status === 204)
            {
                this.setState({msg : test.data.errors[0].msg})
            }
            else if(test.data.status === 200)
            {
                
                alert('Thêm tài khoản nhân viên thành công ');
                this.setState({open : false})
            }
            
        },2001);
        
        
    }

    _renderLoadingBar = () => {
        return this.state.isLoading === true ? <ReactLoading type='spin' color='#FD5E1F' height={30} width={30} /> : '';
    }


    _renderAlert = () => {
        return this.state.msg !== '' ? <Alert color='red' msg={this.state.msg} size={13}></Alert> : '';
    }
   

    render() {
        return (
            <div>
            <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home" style={{color:'#FD5E1F'}}>
            <FaSpider style={{fontSize : 25}}/>
            {'  Crawler Amazon Tool'}
            
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link onClick={() => {this.setState({page : 'crawler'})}}>Crawler</Nav.Link>
                {this.state.checkRole === true ? <Nav.Link  ><span onClick={() => {this.onOpenModal()}}>Tạo tài khoản mới</span></Nav.Link> : ''}
                
                </Nav>
                
                <Form inline>
                   
                <FormControl type="text" placeholder="Search" className="mr-sm-2" disabled />
               <Avatar width={40} height={40} src={`https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-1/p240x240/67560540_706872929750491_5200925105890263040_n.jpg?_nc_cat=101&_nc_oc=AQm3yn7VTZYD6ovICC0KsIA7dMpctpus1KPudkSxBOohMLhw8Ekkrl5B8hifsRXKFr0&_nc_ht=scontent.fsgn2-4.fna&oh=d96282ea6ad6f4090f81c5bb04786edf&oe=5E36E31A`}></Avatar>
                   <a href={'/'}> <FaSignOutAlt   className='logOut' style={{fontSize : 20, marginLeft : 10, color:'#FFFFFF',cursor : 'hand'}}></FaSignOutAlt></a>
                </Form>
            </Navbar.Collapse>
            </Navbar>
            
            <Crawler/>
            
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <Container>
                            <Row>
                                <Col>
                                    <h5 style={{color : '#FD5E1F'}}>Tạo tài khoản mới</h5>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} style={{marginTop : 10,marginBottom:5}}>
                                    <span>Name</span>
                                </Col>
                                <Col xs={12}>
                                <input placeholder={'Nhập tên'} onChange={(e) => {this.setState({name : e.target.value})}} className='inputStyle'/> 
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} style={{marginTop : 10,marginBottom:5}}>
                                    <span>Email</span>
                                </Col>
                                <Col xs={12}>
                                <input placeholder={'Nhập email'} onChange={(e) => {this.setState({email : e.target.value})}} className='inputStyle'/> 
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} style={{marginTop : 10,marginBottom:5}}>
                                    <span>Password</span>
                                </Col>
                                <Col xs={12}>
                                <input placeholder={'Nhập password'} type="password" onChange={(e) => {this.setState({password : e.target.value})}} className='inputStyle'/> 
                                </Col>
                            </Row>

                            <Row style={{marginTop : 15,marginBottom:5}}>
                                <Col xs={12}>
                                <button onClick={() => {this.submitUSer()}} className='buttonStyle'>Thêm tài khoản</button>
                                </Col>
                            </Row>

                            <Row style={{marginTop : 20}}>
                                <Col xs={12} className='item-center'>
                                {this._renderLoadingBar()}
                                </Col>
                            </Row>

                            <Row style={{marginTop : 20}}>
                    
                                <Col xs={12} className='item-center'>
                                {this._renderAlert()}
                                </Col>
                            </Row>

                        </Container>
                </Modal>
            </div>
        )
    }
}
