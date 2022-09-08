import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
  CardContent,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";

function Checkout() {
  const navigate = useNavigate();

  const context = useContext(GlobalContext);
  const [token] = context.token;
  const [order, setOrder] = context.authApi.order;
  const [finalTotal] = context.authApi.finalTotal;
  const [cart, setCart] = context.authApi.cart;

  const [data, setData] = useState({
    address: "",
    paymentMode: "",
  });

  const readValue = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `/api/v1/order/newOrder`,
      {
        cart: cart,
        address: data.address,
        finalTotal: finalTotal, // changed
        paymentMode: data.paymentMode,
        paymentId: Math.floor(Math.random() * 12345689),
        paymentStatus: "unpaid",
      },
      {
        headers: { Authorization: token },
      }
    );
    toast.success("Order Confirmed Successfully");
    setCart([]);
    navigate("/");
    // window.location.href = "/";  // changed
  };
  const submit = () => {
    toast.success("checkout succesfull");
  };

  return (
    <Container>
      <Grid container sx={{paddingTop:"150px"}}>
        <Grid item xs={12}>
          <Typography variant="inherit" align="start">
            <span className="text-muted">Home/Cart/</span>Product checkout
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6"  sx={{ py: 2 }}>
                <strong>
                  {" "}
                  Order total = &#8377; {finalTotal ? finalTotal : null}{" "}
                </strong>
              </Typography>

              <Box component="div">
                <form action="" onSubmit={submitHandler}>
                  <Box component="div">
                    <Typography sx={{ pt: 1, pb: 2 }}>Address</Typography>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      name="address"
                      id="address"
                      rows={5}
                      fullWidth
                      required
                      onChange={readValue}
                      label="address"
                      multiline
                    />
                  </Box>
                  <Grid> 
                  <FormControl sx={{display:"table-row"}}>
                    <FormLabel
                      sx={{ pt: 2 }}
                      id="demo-row-radio-buttons-group-label"
                    >
                      Payment mode
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        type="radio"
                        name="paymentMode"
                        id="paymentMode"
                        checked={data.paymentMode === "cod"}
                        onChange={readValue}
                        value="cod"
                        control={<Radio color="secondary" />}
                        label="Pay on delivery"
                      /> <p>Pay using cash, Paylink (debit, credit card, UPI) or Scan & Pay (Flat INR 25 back on first Scan & Pay transaction)</p>
                      <FormControlLabel
                        type="radio"
                        name="paymentMode"
                        id="paymentMode"
                        checked={data.paymentMode === "card"}
                        value="card"
                        onChange={readValue}
                        control={<Radio color="secondary" />}
                        label="Pay using card"
                      />
                      <img src="https://res.cloudinary.com/dgcy4qkiz/image/upload/v1662572469/Screenshot_2_owwxrt.png" alt="" />
                    </RadioGroup>
                  </FormControl>
                  </Grid>

                  {/* <Divider color="black" sx={{ my: 3 }} /> */}
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={submitHandler}
                    sx={{ my: 3 }}
                  >
                    Place order
                  </Button>
                  <div
                    style={{ display: "flex", justifyContent: "center" }}
                  ></div>
                </form>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    // <div className="container">
    //     <div className="row">
    //           <div className="col-md-12 text-center">
    //               <h3 className="display-3">Check out  </h3>
    //         </div>
    //     </div>

    //       <div className="row">
    //           <div className="col-md-6 offset-md-3">
    //               <div className="card">
    //                   <div className="card-header">
    //                       <h5>Cart Total =  &#8377; {finalTotal ? finalTotal: null } </h5>
    //                   </div>
    //                   <div className="card-body">
    //                       <form onSubmit={submitHandler} >
    //                           <div className="form-group mt-2">
    //                                 <label htmlFor="address">Address</label>
    //                                 <textarea name="address" id="address" cols="30" rows="5" className="form-control" required onChange={readValue} ></textarea>
    //                           </div>
    //                           <div className="form-group mt-2">
    //                               <label htmlFor="mode">Payment mode</label>
    //                               <br />
    //                               <div className="form-check form-check-inline">
    //                                   <input className="form-check-input" type="radio" name="paymentMode" id="paymentMode" checked={ data.paymentMode === "cod" } value="cod" onChange={readValue} />
    //                                  <label className="form-check-label" for="paymentMode">Cash On Delivery</label>
    //                               </div>
    //                                 <div className="form-check form-check-inline">
    //                                 <input className="form-check-input" type="radio" name="paymentMode" id="paymentMode" checked={data.paymentMode === "card"} value="card" onChange={readValue} />
    //                                 <label className="form-check-label" for="paymentMode">Card</label>
    //                                 </div>

    //                           </div>
    //                           <div className="form-group mt-2">
    //                               <input type="submit" value="Check Out" className="btn btn-outline-success" />
    //                             </div>
    //                       </form>
    //                   </div>
    //               </div>
    //             </div>
    //       </div>
    // </div>
  );
}

export default Checkout;
