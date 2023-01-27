// 2023-01-26
import React from 'react';

import {AppBar, Toolbar, Grid, Typography} from "@mui/material";
import { Link } from 'react-router-dom';

import { getUsername, isLogin } from '../util/login-util';

import './Header.css';

const Header = () => {
    const logoutHandler = e => {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('LOGIN_USERNAME');

        window.location.href='/login';
    }

    return (
        <AppBar position="fixed" style={{ background: '#38d9a9' }}>       {/* header 상단에 고정 : fixed */}
            <Toolbar>
                <Grid justify="space-between" container>
                    <Grid item flex={9}>
                        <div style={
                            {
                                display:'flex',
                                alignItems: 'center'
                            }
                        }>
                            <Typography variant="h6">
                                {isLogin() 
                                    ? `${getUsername()}님` 
                                    : '오늘'
                                }의 할일
                            </Typography>
                        </div>
                    </Grid>

                    {/* 2023-01-27 */}
                    <Grid item>
                        <div className='btn-group'>
                            {isLogin()
                                ?   <button className="logout-btn" onClick={logoutHandler}>로그아웃</button>
                                :   (
                                        <>
                                            <Link to='/login'>로그인</Link>
                                            <Link to='/join'>회원가입</Link>
                                        </>
                                    )
                            }
                        </div>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;