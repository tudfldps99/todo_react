import React, { useState } from 'react'

const Hello = () => {
    
    /* 일반 변수는 상태값 관리가 안됨 */
    //let nickName = 'React';
    const [nickName, setNickName] = useState('React')

    // 여기에 쓴 코드는 태그가 렌더링 되기 전에 실행됨

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

    console.log('Hello nickName : ' + nickName);

    return (
        <>
            <h1>Hello {nickName}</h1>

            {/* 함수 사용 */}
            <button className="btn" onClick={sayHello}>척척박사</button>

            {/* 함수 없이 사용 */}
            <button className="btn" onClick={() => { setNickName('척척석사'); }}>척척석사</button>
        </>
    )
}

export default Hello