import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {ReactSVG} from "react-svg";
import {makeAutoObservable} from 'mobx'
import {observer} from "mobx-react";

const Container = styled.div`
  position: relative;
  background-color: #D2EAD2;

  svg path:hover {
    fill: #D2EAD2;
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
const Small2 = styled.h2`
  font-family: "NanumSquareRound", sans-serif;
  font-size: 15px;
  font-weight: 700;
  margin: 0px;
  display: inline;
`

const Popup = observer(({onClickClose}) => {
  const data = mapStore.currentData
	const handleChange = async (event) => {
    document.getElementById('bar-chart').setAttribute("src", data[event.target.id])
    if (event.target.id !== 'total') {
      document.getElementById('title-front').innerText = event.target.value
      document.getElementById('title-back1').style.display = "block"
      document.getElementById('title-back2').style.display = "none"
    } else {
      document.getElementById('title-front').innerText = null
      document.getElementById('title-back1').style.display = "none"
      document.getElementById('title-back2').style.display = "block"
    }
	}
  return <PopupContainer>
    <CloseIconContainer>
      <Box1 onClick={onClickClose}>
        <Margin0>{data?.name}</Margin0> 
        <ReactSVG src='img/1544641784.svg'/>
      </Box1>
      <Box3>
        <Button value={'현수막'} id={'banner'} onClick={handleChange}>#현수막</Button>
        <Button value={'종이 홍보물'} id={'paper'} onClick={handleChange}>#종이_홍보물</Button>  
        <Button value={'명함'} id={'card'} onClick={handleChange}>#명함</Button> 
        <Button value={'유세차량'} id={'truck'} onClick={handleChange}>#유세차량</Button>
        <Button value={'선거복'} id={'clothes'} onClick={handleChange}>#선거복</Button>
        <Button id={'total'} onClick={handleChange}>#전체</Button>
      </Box3>
      <TitleBox>
        <Title id={'title-front'} style={{color: '#1E9248'}}></Title><Title id={'title-back1'} style={{display: 'none'}}>의 CO<Small2>2</Small2> 환산량은?</Title><Title id={'title-back2'}>어떤 후보가 CO<Small2>2</Small2>를 많이 배출했을까?</Title>
      </TitleBox>
      <Box2>
        <Chart id={'bar-chart'} src={data?.total} alt="" />
      </Box2>
    </CloseIconContainer>
  </PopupContainer>
})

const data = {
  incheon: {
    'name': '인천광역시',
    'total': 'img/인천_총탄소배출량.png',
    'banner': 'img/인천_현수막.png',
    'paper': 'img/인천_종이홍보물.png',
    'card': 'img/인천_명함.png',
    'truck': 'img/인천_유세차량.png',
    'clothes': 'img/인천_의류.png',
  },
  daejeon: {
    'name': '대전광역시',
    'total': 'img/대전_총탄소배출량.png',
    'banner': 'img/대전_현수막.png',
    'paper': 'img/대전_종이홍보물.png',
    'card': 'img/대전_명함.png',
    'truck': 'img/대전_유세차량.png',
    'clothes': 'img/대전_의류.png',
  },
  ulsan: {
    'name': '울산광역시',
    'total': 'img/울산_총탄소배출량.png',
    'banner': 'img/울산_현수막.png',
    'paper': 'img/울산_종이홍보물.png',
    'card': 'img/울산_명함.png',
    'truck': 'img/울산_유세차량.png',
    'clothes': 'img/울산_의류.png',
  },
  gangwon: {
    'name': '강원도',
    'total': 'img/강원_총탄소배출량.png',
    'banner': 'img/강원_현수막.png',
    'paper': 'img/강원_종이홍보물.png',
    'card': 'img/강원_명함.png',
    'truck': 'img/강원_유세차량.png',
    'clothes': 'img/강원_의류.png',
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
