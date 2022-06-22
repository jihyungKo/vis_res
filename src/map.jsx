import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {ReactSVG} from "react-svg";
import {makeAutoObservable} from 'mobx'
import {observer} from "mobx-react";

const Container = styled.div`
  position: relative;
  background-color: #D2EAD2;

  svg path:hover {
    fill: blueviolet;
  }
`

const PopupContainer = styled.div`
  position: absolute;
  width: 90vw;
  height: 135vw;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
  box-shadow: rgba(255, 255, 255, 1) 0px 0px 15px;
  border-style: solid;
  border-width: 2px;
`

const CloseIconContainer = styled.div`
  background: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  svg {
    fill: fuchsia;
    stroke: fuchsia;

    &:hover {
      fill: green;
      stroke: green;
    }
  }
`
const Box1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 5px 10px;
`
const Box2 = styled.div`
  width: 100%;
  display: flex;
  height: 65%;
  justify-content: center;
`
const Box3 = styled.div`
  width: 100%;
  display: flex;
  height: 15%;
  flex-wrap: wrap;
  gap: 10px 15px;
  padding: 0px 0px 0px 15px;
`
const TitleBox = styled.div`
  width: 100%;
  display: flex;
  height: 10%;
  justify-content: center;
  padding-top: 20px;
`
const Margin0 = styled.p`
  margin: 0;
  font-family: "LeeSeoyun", sans-serif;
`
const Chart = styled.img`
  display: block;
  max-width: 95%;
  max-height: 65%;
  position: absolute;
  bottom: 5px;
`
const Button = styled.button`
  font-family: "LeeSeoyun", sans-serif;
  font-size: 15px;
`
const Title = styled.h2`
  font-family: "NanumSquareRound", sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0px;
`

const Popup = observer(({onClickClose}) => {
  const data = mapStore.currentData
  return <PopupContainer>
    <CloseIconContainer onClick={onClickClose}>
      <Box1>
        <Margin0>울산광역시</Margin0> 
        <ReactSVG src='img/1544641784.svg'/>
      </Box1>
      <Box3>
        <Button>#현수막</Button>
        <Button>#종이_홍보물</Button>  
        <Button>#명함</Button> 
        <Button>#유세차량</Button>
        <Button>#선거복</Button>
      </Box3>
      <TitleBox>
        <Title style={{color: '#1E9248'}}>종이 홍보물</Title><Title>의 CO2 환산량은?</Title>
      </TitleBox>
      <Box2>
        <Chart src="img/test4.png" alt="" />
      </Box2>
    </CloseIconContainer>
  </PopupContainer>
})

const data = {
  1: {
    'name': '머시기',
    'someValue': 1,
  },
  2: {
    'name': '머시기2',
    'someValue': 2,
  }
}

class MapStore {
  currentData = {}
  isPopupOpen = false

  constructor() {
    makeAutoObservable(this)
  }

  show(areaId) {
    this.currentData = data[areaId]
    this.isPopupOpen = true
  }

  hide() {
    this.isPopupOpen = false
  }
}

const mapStore = new MapStore()

const onMapClickHandler = (e) => {
  const areaId = e.target.getAttribute('aid')
  mapStore.show(areaId)
}

export const Map = observer(() => {
  const mapRef = useRef()
  useEffect(() => {
    return () => {
      const svg = mapRef.current
      if (svg) {
        svg.removeEventListener('click', onMapClickHandler)
      }
    }
  }, [])
  return <Container>
    <ReactSVG
      id='map-svg'
      src='img/map.svg'
      afterInjection={(error, svg) => {
        if (error) {
          console.error(error)
          return
        }
        mapRef.current = svg
        svg.addEventListener('click', onMapClickHandler)
      }}
    />
    {mapStore.isPopupOpen && <Popup onClickClose={() => mapStore.hide()}/>}
  </Container>
})
