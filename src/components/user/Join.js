// 2023-01-26
import React, { useState } from 'react';

import {Button, Container, Grid, TextField, Typography, Link} from "@mui/material";

import { BASE_URL, USER } from '../../config/host-config';

const Join = () => {

    const API_BASE_URL = BASE_URL + USER;   // http://localhost:8080//api/auth

    // 검증 메시지 저장
    const [message, setMessage] = useState({
        username: '',
        password: '',
        repassword: '',
        email: ''
    });

    // 검증 완료 여부
    const [validate, setValidate] = useState({
        username: false,
        password: false,
        repassword: false,
        email: false
    });

    // 입력값 저장
    const [userValue, setUserValue] = useState({
        userName: '',
        password: '',
        email: ''
    });


    // 유저 이름 입력란 검증 체인지 이벤트 핸들러
    const nameHandler = e => {

        // 검증 시작
        let msg;
        const nameRegex = /^[가-힣]{2,5}$/;     // 2-5자리 한글 제한

        if (!e.target.value) {      // 유저이름 미입력
            msg = '유저 이름은 필수 값입니다.';
            setValidate({
                ...validate,
                username: false
            });
        }
        else if (!nameRegex.test(e.target.value)) {
            msg = '2~5글자 사이의 한글로만 작성해주세요.'; 
            setValidate({
                ...validate,
                username: false
            });
        } 
        else {
            msg = '사용 가능한 이름입니다.';
            setValidate({
                ...validate,
                username: true
            });
        }

        setMessage({
            ...message,
            username: msg
        });

        setUserValue({
            ...userValue,
            userName: e.target.value
        })
    };

    // 이메일 입력란 검증 체인지 이벤트 핸들러
    const emailHandler = e => {

        // 검증 시작
        let msg;
        const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

        if (!e.target.value) {
            msg = '이메일은 필수값입니다.';
            setValidate({...validate, email: false});
        } 
        else if (!emailRegex.test(e.target.value)) {
            msg = '이메일 형식이 아닙니다.';
            setValidate({...validate, email: false});
        }
        else {      // 중복확인
            checkEmail(e.target.value);
        }
        setMessage({
            ...message, 
            email: msg
        });
    
        setUserValue({
            ...userValue,
            email: e.target.value
        })
    }

    // 이메일 중복확인 요청 함수
    const checkEmail = email => {
        fetch(`${API_BASE_URL}/check?email=${email}`)
            .then(res => res.json())
            .then(flag => {
                let msg;

                if (flag) {
                    msg = '중복된 이메일입니다.';
                    setValidate ({
                        ...validate,
                        email: false
                    })
                } else {
                    msg = '사용 가능한 이메일입니다.';
                    setValidate({
                        ...validate,
                        email: true
                    })
                }

                setMessage({
                    ...message,
                    email: msg
                })
            });
    }

    // 비밀번호 입력란 검증 체인지 이벤트 핸들러
    const passwordHandler = e => {

        // 패스워드 재입력란 비우기 (2023-01-27)
        document.getElementById('password-check').value= '';
        document.getElementById('check-text').textContent='';
        setValidate({
            ...validate,
            repassword: false
        })

        // 검증 시작
        let msg;
        const pwRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

        if (!e.target.value) {      // 패스워드 미입력
            msg = '비밀번호는 필수 값입니다.';
            setValidate({
                ...validate,
                password: false
            });
        }
        else if (!pwRegex.test(e.target.value)) {
            msg = '8글자 사이의 영문,숫자,특수문자를 포함해주세요.'; 
            setValidate({
                ...validate,
                password: false
            });
        } 
        else {
            msg = '사용 가능한 비밀번호입니다.';
            setValidate({
                ...validate,
                password: true
            });
        }

        setMessage({
            ...message,
            password: msg
        });

        setUserValue({
            ...userValue,
            password: e.target.value
        })
    };
    
    // 비밀번호 재입력
    const rePasswordHandler = e => {

        // 검증 시작
        let msg;
        
        if (!e.target.value) {      // 패스워드 미입력
            msg = '비밀번호는 필수 값입니다.';
            setValidate({
                ...validate,
                repassword: false
            });
        } else if (e.target.value !== userValue.password) {
            msg = '비밀번호가 다릅니다.';
            setValidate({
                ...validate,
                repassword: false
            })
        } else {
            msg = '비밀번호가 동일합니다.';
            setValidate({
                ...validate,
                repassword: true
            })
        }

        setMessage({
            ...message,
            repassword: msg
        });
    }

    // validate객체 안의 모든 논리값이 true인지 검사하는 함수
    const isValid = () => {
        // of : 배열 반복, in : 객체 반복
        // 객체에서 key값만 뽑아줌 'username' <- 문자로 나옴 
        for ( let key in validate ) {
            let value = validate[key];      // 문자로 나오면 배열처럼 참조
            if (!value) return false;       // 하나라도 false 면 return false
        }
        return true;
    }

    // 회원가입 요청 서버로 보내기
    const submitHandler = e => {
        e.preventDefault();     // form 태그의 자동 전송 막기

        // 입력값 검증을 올바르게 수행했는지 검사
        if (isValid()) {

            fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userValue)     // <-- 입력값 저장한 객체 넣어주기
            })
            .then(res => {
                if (res.status === 200) {
                    alert('회원가입을 축하합니다.');

                    // 로그인페이지로 리다이렉트 - 2023-01-27
                    window.location.href = '/login';
                } else {
                    alert('회원가입에 실패했습니다. 잠시 후 다시 시도하세요');
                }
            });
        } else {
            alert('입력창 재확인 필요');
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ margin: "300px auto" }}>
            <form noValidate onSubmit={submitHandler}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            계정 생성
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField          // input 태그
                            autoComplete="fname"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="유저 이름"
                            autoFocus
                            
                            onChange={nameHandler}
                        />
                        <span style={
                            validate.username
                            ? {color: 'green'}
                            : {color: 'red'}
                        }>
                            {message.username}
                        </span>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name="email"
                            autoComplete="email"

                            onChange={emailHandler}
                        />
                        <span style={
                            validate.email
                            ? {color: 'green'}
                            : {color: 'red'}
                        }>
                            {message.email}
                        </span>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"

                            onChange={passwordHandler}
                        />
                        <span style={
                            validate.password
                            ? {color: 'green'}
                            : {color: 'red'}
                        }>
                            {message.password}
                        </span>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password-check"
                            label="패스워드 재입력"
                            type="password"
                            id="password-check"
                            autoComplete="current-password"

                            onChange={rePasswordHandler}
                        />
                        <span id='check-text' style={
                            validate.repassword
                            ? {color: 'green'}
                            : {color: 'red'}
                        }>
                            {message.repassword}
                        </span>
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            계정 생성
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            이미 계정이 있습니까? 로그인 하세요.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Join;