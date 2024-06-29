
You
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
var bnr = require('./../../images/background/bg6.jpg');


const  Register2 = (props) => {
	const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) return;
        dispatch(loadingToggleAction(true));
        dispatch(signupAction(email, password, props.history));
    }
	return(
		<div className="page-wraper">
			<div className="browse-job login-style3">
				
				<div className="bg-img-fix" style={{backgroundImage:`url(${bnr})`, height: "100vh" }}>
					<div className="row">
						<div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom">
							<div className="login-form style-2">
								<div className="logo-header text-center p-tb30">
									<Link to={"./"}><img src={require("./../../images/logo.png")} alt="" /></Link>
								</div>
								<div className="clearfix"></div>
								<div className="tab-content nav p-b30 tab">
									<div id="login" className="tab-pane active ">
										{props.errorMessage && (
											<div className=''>
												{props.errorMessage}
											</div>
										)}
										{props.successMessage && (
											<div className=''>
												{props.successMessage}
											</div>
										)}
										<form className=" dez-form p-b30" onSubmit={onSignUp}>
											<h3 className="form-title m-t0">Personal Information</h3>
											<div className="dez-separator-outer m-b5">
												<div className="dez-separator bg-primary style-liner"></div>
											</div>
											<p>Enter your e-mail address and your password. </p>
											<div className="form-group">
												<input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="hello@example.com" />
											 <div className="text-danger">{errors.email && <div>{errors.email}</div>}</div>
											</div>
											<div className="form-group">
												<input value={password} className="form-control" defaultValue="Password"
													onChange={(e) =>
														setPassword(e.target.value)
													}												  
												/>
												<div className="text-danger">{errors.password && <div>{errors.password}</div>}</div>
											</div>
											<div className="form-group text-left">
												<button type="submit" className="site-button dz-xs-flex m-r5">Sign me up</button>
												<span className="custom-control custom-checkbox">
													<input type="checkbox" className="custom-control-input" id="check1" name="example1" />
													<label className="custom-control-label" htmlFor="check1">Remember me</label>
												</span>
												<Link data-toggle="tab" to="#forgot-password" className="forget-pass m-l5"><i className="fa fa-unlock-alt"></i> Forgot Password</Link> 
											</div>
											<div className="dz-social clearfix">
												<h5 className="form-title m-t5 pull-left">Sign In With</h5>
												<ul className="dez-social-icon dez-border pull-right dez-social-icon-lg text-white">
													<li><Link to={''} className="fa fa-facebook  fb-btn mr-1"  target="bank"></Link></li>
													<li><Link to={''} className="fa fa-twitter  tw-btn mr-1"   target="bank"></Link></li>
													<li><Link to={''} className="fa fa-linkedin link-btn mr-1" target="bank"></Link></li>
													<li><Link to={''} className="fa fa-google-plus  gplus-btn" target="bank"></Link></li>
												</ul>
											</div>
										</form>
										<div className="text-center bottom"> 
											<Link to="/login" className="site-button button-md btn-block text-white">Sign In</Link> 
										</div> 
									</div>
								</div>
								<div className="bottom-footer clearfix m-t10 m-b20 row text-center">
									<div className="col-lg-12 text-center">
										<span> © Copyright by <i className="fa fa-heart m-lr5 text-red heart"></i>
										<Link to= {''} >DexignZone </Link> All rights reserved.</span> 
									</div>
								</div>	
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	)
}
export default Register2

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};