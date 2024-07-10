import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <div className='jumbotron text-center'>
        <div className='container'>
          <h1 className='display-4'>Welcome to Print-On-Demand</h1>
          <p className='lead'>Create and customize your own products with ease. High-quality printing and fast delivery.</p>
          <p>
            <a className='btn btn-primary btn-lg' href='/products' role='button'>
              Shop Now
            </a>
          </p>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card'>
              <img src='https://via.placeholder.com/150' className='card-img-top' alt='Custom T-Shirts' />
              <div className='card-body'>
                <h5 className='card-title'>Custom T-Shirts</h5>
                <p className='card-text'>Design your own custom t-shirts with our easy-to-use online designer.</p>
                <a href='/products' className='btn btn-primary'>
                  View Products
                </a>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <img src='https://via.placeholder.com/150' className='card-img-top' alt='Custom Mugs' />
              <div className='card-body'>
                <h5 className='card-title'>Custom Mugs</h5>
                <p className='card-text'>Create personalized mugs for any occasion.</p>
                <a href='/products' className='btn btn-primary'>
                  View Products
                </a>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <img src='https://via.placeholder.com/150' className='card-img-top' alt='Custom Hoodies' />
              <div className='card-body'>
                <h5 className='card-title'>Custom Hoodies</h5>
                <p className='card-text'>Customize your own hoodies with our online designer.</p>
                <a href='/products' className='btn btn-primary'>
                  View Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
