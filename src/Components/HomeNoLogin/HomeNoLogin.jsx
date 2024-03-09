import React, { useContext } from 'react'
import { tokenContext } from '../../Context/TokenContext.js';
import FeatureProductslogin from '../FeatureProducts/FeatureProductsLogin.jsx';
import CategorySlider from '../CategorySlider/CategorySlider.jsx';
import MainSlider from '../MainSlider/MainSlider.jsx';

export default function Home() {
  let {token} = useContext(tokenContext);

  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <FeatureProductslogin/>
    </>
  )
}