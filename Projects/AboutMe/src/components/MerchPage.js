import React, { useState } from 'react';
import styled from 'styled-components';
import img from "../assets/Images/bg.jpg";
import LogoComponent from '../subComponents/LogoComponent';
import PowerButton from '../subComponents/PowerButton';

import { v4 as uuidv4 } from 'uuid';
import listings from '../data/Listings';

import BigTitle from "../subComponents/BigTitlte";
import { motion } from 'framer-motion';

const MainContainer = styled(motion.div)`
  background-image: url(${img});
  background-size: cover;
  background-repeat: repeat-y;
  background-attachment: fixed;
  background-position: center;
`;

const Container = styled.div`
  background-color: ${props => `rgba(${props.theme.bodyRgba},0.7)`};
  width: 100%;
  height:100vh;
  position: relative;
  padding-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(calc(10rem + 15vw), 1fr));
  grid-gap: calc(1rem + 2vw);
  @media screen and (max-width: 600px) {
    &{
      grid-template-columns: repeat(1, minmax(calc(10rem + 15vw), 1fr));
    }
  }
`;

const Customs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(calc(10rem + 15vw), 1fr));
  grid-gap: calc(1rem + 2vw);
  @media screen and (max-width: 600px) {
    &{
      grid-template-columns: repeat(2, minmax(calc(5rem + 15vw), 1fr));
      grid-gap: 1rem;

    }
  }
`;

const Cart = styled.a`
  color: ${props => props.theme.text};
  position: fixed;
  top: 2.2rem;
  right: calc(1rem + 2vw);
  text-decoration: none;
  z-index:1;
`;

const Footer = styled.div`
  text-align: center;
  bottom: 1rem;
`;

const CollectionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CollectionCard = styled.div`
  margin: 1rem;
  text-align: center;
  cursor: pointer;

  hr{
    background: var(--main-decor-color);
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    height: 3px;
    width: 150px;
    border-radius: 5px;
    border: hidden;
    margin-inline-start: auto;
    margin-inline-end: auto;
  }
`;

const ProductImage = styled.img`
  max-width: 40rem;
  height: auto;
  filter: drop-shadow(0px 0px 100px rgba(255,215,0, 0.3));
  justify-self: center;
`;

// Framer-motion config
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
    }
  }
};

const App = () => {

  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [purchasedItem, setPurchasedItem] = useState(null);

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
    setSelectedProduct(collection.products[0]);
    setSelectedSize(collection.products[0].sizes[0]);
    setSelectedColor(collection.products[0].colors[0]);
    setPurchasedItem(null);
  };

  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = selectedCollection.products.find((p) => p.id === productId);
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setPurchasedItem(null);
  };

  const handleSizeChange = (event) => {
    const sizeName = event.target.value;
    const size = selectedProduct.sizes.find((s) => s.name === sizeName);
    setSelectedSize(size);
  };

  const handleColorChange = (event) => {
    const colorName = event.target.value;
    const color = selectedProduct.colors.find((c) => c.name === colorName);
    setSelectedColor(color);
  };

  const handlePurchase = () => {
    if (selectedProduct && selectedSize && selectedColor) {
      const purchasedItem = {
        product: selectedProduct,
        size: selectedSize,
        color: selectedColor,
      };

      const message = `Successfully purchased an ${selectedSize.name} sized ${selectedProduct.clothingType} in ${selectedColor.name} color priced $${selectedSize.price}`;
      alert(message);
      console.log(message);

      setPurchasedItem(purchasedItem);
    } else {
      console.log("either product size or color not selected");
    }
  };

  return (
    <>
      <MainContainer
        variants={container}
        initial='hidden'
        animate='show'
        exit={{
          opacity: 0, transition: { duration: 0.5 }
        }}
      >
        <BigTitle text="SERIES" top="3rem" left="1rem" />
        <Container>
          <div style={{ position: 'absolute !important' }}>
            <LogoComponent />
            <PowerButton />
            <Cart href="/cart">
              <motion.h2
                initial={{
                  y: 0, // -200 for animation
                  transition: { type: 'spring', duration: 1.5, delay: 1 }
                }}
                animate={{
                  y: 0,
                  transition: { type: 'spring', duration: 1.5, delay: 1 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                View Cart
              </motion.h2>
            </Cart>
          </div>

          <div className="app" style={{ top: '10rem' }}>
            {!selectedCollection && (
              <>
                <CollectionsContainer>
                  {Object.keys(listings).map((collectionName) => {
                    const collection = listings[collectionName];
                    return (
                      <CollectionCard key={collectionName} onClick={() => handleCollectionClick(collection)}>
                        <br></br>
                        <div className="hero">
                        <h2>{collection.name}</h2>
                        <p>{collection.products.map((product) => product.clothingType).join(" • ")}</p>
                        </div>
                        <hr></hr>
                        <img src={collection.hero} alt={collection.name} className="hero-image" />
                      </CollectionCard>
                    );
                  })}
                </CollectionsContainer>
              </>
            )}

            {selectedCollection && (
              <>
                {selectedProduct && (
                  <>
                    <div className="products">
                      <div className="render">
                        <h2>{selectedCollection.name}</h2>
                        <Grid>
                          <ProductImage src={selectedColor.image} alt={selectedColor.name} className="product-image" />
                        </Grid>
                      </div>
                      {/* <br></br> */}
                      {/* <hr></hr> */}
                      <div className='details' style={{ textAlign: 'center' }}>
                        <p style={{ textAlign: 'center' }}>
                          <select className="input" style={{ textAlignLast: 'center' }} value={selectedProduct ? selectedProduct.id : selectedCollection.products[0].id} onChange={handleProductChange}>
                            {selectedCollection.products.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.clothingType}
                              </option>
                            ))}
                          </select>
                        </p>
                        <br></br>
                        <Customs>
                          <p>Select Color:<br></br>
                            <select className="" style={{ textAlignLast: 'center' }} value={selectedColor ? selectedColor.name : ""} onChange={handleColorChange}>
                              {selectedProduct.colors.map((color) => (
                                <option key={uuidv4()} value={color.name}>
                                  {color.name}
                                </option>
                              ))}
                            </select>
                          </p>
                          <p>Select Size:<br></br>
                            <select className="" style={{ textAlignLast: 'center' }} value={selectedSize ? selectedSize.name : ""} onChange={handleSizeChange}>
                              {selectedProduct.sizes.map((size) => (
                                <option key={uuidv4()} value={size.name}>
                                  {size.name}
                                </option>
                              ))}
                            </select></p>
                        </Customs>
                        {selectedSize && selectedColor && (
                          <>
                            <br></br>
                            <p>Price: ${selectedSize.price} AUD</p>
                            <br></br>
                            <button className="w3-button" onClick={handlePurchase} style={{ fontSize: '1.24rem', width: '100%'}}>Add to Cart</button>
                            {/* <br></br> */}
                            {/* <br></br> */}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}


                {purchasedItem && (
                  <div className="purchased-item">
                    <h2>Item added to cart</h2>
                    <p>Collection: {selectedCollection.name}</p>
                    <p>Name: {purchasedItem.product.clothingType}</p>
                    <p>Size: {purchasedItem.size.name}</p>
                    <p>Color: {purchasedItem.color.name}</p>
                    <p>Price: ${purchasedItem.size.price}</p>
                  </div>
                )}
              </>
            )}
          </div>
          <Footer>
            Copyright © 2023 CybryX | All rights reserved
            <br />
            Actual product may differ.
          </Footer>
          <br></br>
        </Container>
      </MainContainer>
    </>
  );
};

export default App;
