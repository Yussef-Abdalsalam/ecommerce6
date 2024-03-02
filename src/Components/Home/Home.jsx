import React, { useContext } from 'react'
import styles from './Home.module.css';
import { tokenContext } from '../../Context/TokenContext';
import FeatureProducts from '../FeatureProducts/FeatureProducts.jsx';
import CategorySlider from '../CategorySlider/CategorySlider.jsx';
import MainSlider from '../MainSlider/MainSlider.jsx';

export default function Home() {
  let {token} = useContext(tokenContext);

  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <FeatureProducts/>
    </>
  )
}