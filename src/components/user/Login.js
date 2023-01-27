// 2023-01-27
import React from "react";
import {Grid, Button, Container, Typography, TextField} from "@mui/material";

import { BASE_URL, USER } from '../../config/host-config';

const Login = () => {

    const API_BASE_URL = BASE_URL + USER;   // http://localhost:8080//api/auth

    const loginHandler = e => {
        e.preventDefault();     // 자동 submit 막기

        // 입력값 검증 생략)

        // 이메일 입력태그, 비밀번호 입력태그
        const $email = document.getElementById('email');
        const $password = document.getElementById('password');

        // 서버에 로그인 요청
        fetch(`${API_BASE_URL}/signin`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: $email.value,
                password: $password.value
            })
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result);

            if (result.message) {
                // 메세지가 있으면 로그인 실패
                alert(result.message);
            } else {
                // 메세지가 없으면 로그인 성공

                // 발급받은 토큰과 회원정보를 클라이언트가 저장
                // 브라우저가 제공하는 localStorage (브라우저가 종료되어도 남아있음 - 자동로그인)
                //                   sessionStorage (브라우저가 종료되면 사라짐)
                localStorage.setItem('ACCESS_TOKEN', result.token);
                localStorage.setItem('LOGIN_USERNAME', result.userName);

                window.location.href='/';
            }
        });
    }

    return (
        <Container component="main" maxWidth="xs" style={{ margin: "300px auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
            </Grid>

            <form noValidate onSubmit={loginHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="email address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="on your password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Container>
    );
};

export default Login;