import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {ReactSVG} from "react-svg";
import {makeAutoObservable} from 'mobx'
import {observer} from "mobx-react";

const Container = styled.div`
  position: relative;
  background-color: cyan;

  svg path:hover {
    fill: blueviolet;
  }
`

const PopupContainer = styled.div`
  position: absolute;
  bottom: 10%;
  right: 10%;
  padding: 16px;
  background-color: red;
`

const CloseIconContainer = styled.div`
  background-color: blue;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: flex-end;

  svg {
    fill: fuchsia;
    stroke: fuchsia;

    &:hover {
      fill: green;
      stroke: green;
    }
  }
`

const Popup = observer(({onClickClose}) => {
  const data = mapStore.currentData
  return <PopupContainer>
    <CloseIconContainer onClick={onClickClose}>
      <ReactSVG src='img/close-icon.svg'/>
    </CloseIconContainer>
    이름: {data?.name}<br/>
    어떤값: {data?.someValue}
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
