"use client"
import React, { ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '@/app/register/store/register.query';
import { setAuthState, setErrors,saveRegisterData } from '@/app/register/store/register.slice';
import { selectRegisterState, selectRegisterErrors } from '@/app/register/store/register.selectors';
import { toast } from 'react-toastify';
import { navigateSource } from '@/lib/action';
import styles from './styles/Register.module.css';
import { RootState } from '@/store';

const bnr = require('./../../images/background/bg6.jpg');

const LoginSection = () => {
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const authState = useSelector(selectRegisterState);
  const errors = useSelector(selectRegisterErrors);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await register(authState).unwrap();
      if (res.code === 200) {
        localStorage.setItem('registerData', JSON.stringify(authState));
        dispatch(saveRegisterData(authState)); // Save the register data in store
        toast.success(res?.message, { theme: 'colored' });
        navigateSource('/send-otp');
      } else if (res.code === 404 && res.data) {
        dispatch(setErrors(res.data.error));
      }
    } catch (err) {
      console.error('Registration failed:', err);
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setAuthState({ [name]: value }));
  };

  return (
    <div className={styles['page-wraper']}>
      <div className="browse-job login-style3">
        <div
          className={styles['bg-img-fix']}
          style={{
            backgroundImage: `url(${bnr.default.src})`,
            height: '100vh',
          }}
        >
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom">
              <div className="login-form style-2" style={{ width: '100%' }}>
                <div className="logo-header text-center p-tb30">
                  <Link href={"./"}>
                    <img src={require('./../../images/logo.png')} alt="" />
                  </Link>
                </div>
                <div className="clearfix"></div>
                <div className="tab-content nav p-b30 tab">
                  <div
                    id="login"
                    className="tab-pane active"
                    style={{ marginBottom: '50px' }}
                  >
                    <form className="dez-form p-b30" method="post" onSubmit={handleSubmit}>
                      <h3
                        className={`${styles['form-title']} ${styles['rubik-font']}`}
                      >
                        Sign Up
                      </h3>
                      <div className="dez-separator-outer m-b5">
                        <div className="dez-separator bg-primary style-liner"></div>
                      </div>
                      <p className={styles['lato-fonts']}>
                        Enter your Personal details below:
                      </p>
                      <div className="form-group">
                        <input
                          className={`form-control w-full ${styles['lato-font']}`}
                          placeholder="Full Name"
                          name="name"
                          onChange={handleInputChange}
                        />
                        <span className={`${styles['text-danger']}`}>{errors?.name?.[0]}</span>
                      </div>
                      <div className="form-group">
                        <input
                          className={`form-control w-full ${styles['lato-font']}`}
                          placeholder="Email"
                          name="email"
                          onChange={handleInputChange}
                        />
                        <span className={`${styles['text-danger']}`}>{errors?.email?.[0]}</span>
                      </div>
                      <div className="form-group">
                        <input
                          className={`form-control w-full ${styles['lato-font']}`}
                          type="number"
                          name="mobile_number"
                          onChange={handleInputChange}
                          placeholder="Mobile Number"
                        />
                        <span className={`${styles['text-danger']}`}>{errors?.mobile_number?.[0]}</span>
                      </div>
                      <div className="form-group w-full d-flex justify-content-center">
                        <button
                          type="submit"
                          className={`site-button dz-xs-flex m-r5 text-center ${styles['lato-fonts']}`}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Loading...' : 'Register'}
                        </button>
                      </div>
                    </form>
                    <div
                      className={styles['lato-font']}
                      style={{ marginTop: '0px' }}
                    >
                      <h5
                        className={styles['lato-font']}
                        style={{
                          fontSize: '15px',
                          fontWeight: '600',
                        }}
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className={styles['custom-checkbox']}
                        />{' '}
                        I agree to the{' '}
                        <span style={{ color: 'blue' }}>Terms of Service</span>{' '}
                        & <span style={{ color: 'blue' }}>Privacy Policy</span>
                      </h5>
                      <Link
                        className="site-button outline gray button-md"
                        data-toggle="tab"
                        href="/"
                        style={{ marginTop: '20px' }}
                      >
                        <p className={styles['lato-font']}>Back</p>
                      </Link>
                      <button
                        className="site-button pull-right button-md"
                        style={{ marginTop: '20px' }}
                      >
                        <p className={styles['lato-font']}>Submit</p>
                      </button>
                    </div>
                    <div className="text-center bottom"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
