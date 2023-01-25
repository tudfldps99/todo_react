// 2023-01-20, 2023-01-25(useEffect)
import React, { useState, useEffect } from 'react'

// 함수형 컴포넌트
const Hello = () => {
    
    /* 일반 변수는 상태값 관리(값 유지)가 안됨 */
    //let nickName = 'React';
    const [nickName, setNickName] = useState('React')

    // [여기에 쓴 코드는 태그가 렌더링 되기 전에 실행됨]

    /*      -잘못된 방법-
    const $btn = document.querySelector('.btn');
    $btn.onclick = e => {
        alert('박사님 안녕');
    };
    */

    /* 이벤트 핸들러 함수 정의   -올바른 방법- */
    const sayHello = e => {
        
        // 상태변수 값을 변경할때는 직접 대입하면 안되고, 상태변경함수를 이용해야 함
        // nickName = '척척박사'; (X)
        setNickName('척척박사');    // (O)
    };

    // 2023-01-25
    // 화면이 처음 렌더링(마운드) 될 때, 상태값이 변경될 때 호출
    // 2번째 파라미터에 의존성 배열을 넣을 수 있음
        // -> 빈배열 설정 시 초기 렌더링 시에 단 1회만 호출 (값 변경 시 useEffect 실행 안됨)
        // -> 의존성 배열에 상태값을 넣으면 해당 값이 업데이트 될 때 다시 호출
    useEffect(() => {
        console.log('2. useEffect call!');
        console.log('3. nickName(useEffect): ' + nickName);

        // 정리함수
        // 화면이 리렌더링 되기 직전에 호출 (지워지기 전에 호출)
        return () => {
            console.log('4. cleanup call!!');
            console.log('5. nickName(cleanup) : ' + nickName);
        };

    }, [nickName]);

    console.log('1. Hello nickName(component) : ' + nickName);

    const foo = () => {
        console.log('foo');
    }

    /* 
        컴포넌트 내 실행코드 (1순위) - 화면이 그려지기도 전에 실행됨
        렌더링 시에 실행되는 코드 (2순위) [foo()]
        useEffect에 있는 콜백 (3순위)   [useEffect()]
    */
    
    return (        // JSX
        <>
            {foo()} 
            <h1>Hello {nickName}</h1>

            {/* 함수 사용 */}
            <button className="btn" onClick={sayHello}>척척박사</button>

            {/* 함수 없이 사용 */}
            <button className="btn" onClick={() => { setNickName('척척석사'); }}>척척석사</button>
        </>
    )
}

export default Hello