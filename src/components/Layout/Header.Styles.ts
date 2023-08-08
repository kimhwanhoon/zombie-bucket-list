import styled from 'styled-components'

export const S ={
  Header: styled.header`
  border: 3px solid #ff0fa7;
  display: flex;
  justify-content: space-between;
  height: 75px;
  align-items: center;
  `,

  UserDiv: styled.div`
  display: flex;
  align-items: center;
  gap: 20px
  `,

  UserImage: styled.div`
  background: #ffffff;
  height: 36px;
  width: 36px;
  border-radius:50%;
  overflow: hidden;
  background-color: black;
  
  img{
    width:36px;
    height:36px; 
    object-fit:cover;
  }
  `
};





