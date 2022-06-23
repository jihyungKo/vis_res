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
  padding: 0px 15px 0px 15px;
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
  color: #000000;
  border-width: 1.2px;
  border-color: #333333;
  border-radius: 3px;
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
  seoul: {
    'name': '서울특별시',
    'total': 'img/서울_총탄소배출량.png',
    'banner': 'img/서울_현수막.png',
    'paper': 'img/서울_종이홍보물.png',
    'card': 'img/서울_명함.png',
    'truck': 'img/서울_유세차량.png',
    'clothes': 'img/서울_의류.png',
  },
  sejong: {
    'name': '세종특별자치시',
    'total': 'img/세종_총탄소배출량.png',
    'banner': 'img/세종_현수막.png',
    'paper': 'img/세종_종이홍보물.png',
    'card': 'img/세종_명함.png',
    'truck': 'img/세종_유세차량.png',
    'clothes': 'img/세종_의류.png',
  },
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
  gwangju: {
    'name': '광주광역시',
    'total': 'img/광주_총탄소배출량.png',
    'banner': 'img/광주_현수막.png',
    'paper': 'img/광주_종이홍보물.png',
    'card': 'img/광주_명함.png',
    'truck': 'img/광주_유세차량.png',
    'clothes': 'img/광주_의류.png',
  },
  daegu: {
    'name': '대구광역시',
    'total': 'img/대구_총탄소배출량.png',
    'banner': 'img/대구_현수막.png',
    'paper': 'img/대구_종이홍보물.png',
    'card': 'img/대구_명함.png',
    'truck': 'img/대구_유세차량.png',
    'clothes': 'img/대구_의류.png',
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
  busan: {
    'name': '부산광역시',
    'total': 'img/부산_총탄소배출량.png',
    'banner': 'img/부산_현수막.png',
    'paper': 'img/부산_종이홍보물.png',
    'card': 'img/부산_명함.png',
    'truck': 'img/부산_유세차량.png',
    'clothes': 'img/부산_의류.png',
  },
  gyeonggi: {
    'name': '경기도',
    'total': 'img/경기_총탄소배출량.png',
    'banner': 'img/경기_현수막.png',
    'paper': 'img/경기_종이홍보물.png',
    'card': 'img/경기_명함.png',
    'truck': 'img/경기_유세차량.png',
    'clothes': 'img/경기_의류.png',
  },
  gangwon: {
    'name': '강원도',
    'total': 'img/강원_총탄소배출량.png',
    'banner': 'img/강원_현수막.png',
    'paper': 'img/강원_종이홍보물.png',
    'card': 'img/강원_명함.png',
    'truck': 'img/강원_유세차량.png',
    'clothes': 'img/강원_의류.png',
  },
  chungbuk: {
    'name': '충청북도',
    'total': 'img/충북_총탄소배출량.png',
    'banner': 'img/충북_현수막.png',
    'paper': 'img/충북_종이홍보물.png',
    'card': 'img/충북_명함.png',
    'truck': 'img/충북_유세차량.png',
    'clothes': 'img/충북_의류.png',
  },
  chungnam: {
    'name': '충청남도',
    'total': 'img/충남_총탄소배출량.png',
    'banner': 'img/충남_현수막.png',
    'paper': 'img/충남_종이홍보물.png',
    'card': 'img/충남_명함.png',
    'truck': 'img/충남_유세차량.png',
    'clothes': 'img/충남_의류.png',
  },
  jeonbuk: {
    'name': '전라북도',
    'total': 'img/전북_총탄소배출량.png',
    'banner': 'img/전북_현수막.png',
    'paper': 'img/전북_종이홍보물.png',
    'card': 'img/전북_명함.png',
    'truck': 'img/전북_유세차량.png',
    'clothes': 'img/전북_의류.png',
  },
  jeonnam: {
    'name': '전라남도',
    'total': 'img/전남_총탄소배출량.png',
    'banner': 'img/전남_현수막.png',
    'paper': 'img/전남_종이홍보물.png',
    'card': 'img/전남_명함.png',
    'truck': 'img/전남_유세차량.png',
    'clothes': 'img/전남_의류.png',
  },
  gyeongbuk: {
    'name': '경상북도',
    'total': 'img/경북_총탄소배출량.png',
    'banner': 'img/경북_현수막.png',
    'paper': 'img/경북_종이홍보물.png',
    'card': 'img/경북_명함.png',
    'truck': 'img/경북_유세차량.png',
    'clothes': 'img/경북_의류.png',
  },
  gyeongnam: {
    'name': '경상남도',
    'total': 'img/경남_총탄소배출량.png',
    'banner': 'img/경남_현수막.png',
    'paper': 'img/경남_종이홍보물.png',
    'card': 'img/경남_명함.png',
    'truck': 'img/경남_유세차량.png',
    'clothes': 'img/경남_의류.png',
  },
  jeju: {
    'name': '제주특별자치도',
    'total': 'img/제주_총탄소배출량.png',
    'banner': 'img/제주_현수막.png',
    'paper': 'img/제주_종이홍보물.png',
    'card': 'img/제주_명함.png',
    'truck': 'img/제주_유세차량.png',
    'clothes': 'img/제주_의류.png',
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
