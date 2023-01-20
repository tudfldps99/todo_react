import React from 'react'

// props : 부모 컴포넌트가 보내준 데이터가 담긴 객체
const FoodItem = ({foodName, price}) => {         // props 로 사용하면 밑에서 {props.foodName} {props.price} 으로 사용
    return (
        <li>
            <a href="/">{foodName} ({price}원)</a>
        </li>
    )
}

export default FoodItem