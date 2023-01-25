// 2023-01-25
import React from 'react'

// props 는 부모컴포넌트가 속성값으로 전달한 데이터 객체
const Item = ({ foodInfo }) => {

    //   console.log('props: ', props.foodInfo);
    //   console.log('foodInfo: ', foodInfo)

    const { foodName, price:pr, quantity:qt } = foodInfo;
    return (
        <li>음식명: {foodName}, 가격: {pr}, 수량: {qt}</li>
    )
}

export default Item