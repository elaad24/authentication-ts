import React, { FormEvent, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { LoginService } from "../Service/request";
import axios, { AxiosError } from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [userNameErrorTxt, setUserNameErrorTxt] = useState<string | null>(null);
  const [userPasswordErrorTxt, setUserPasswordErrorTxt] = useState<
    string | null
  >(null);
  const [validation, setValidation] = useState<boolean | undefined>(false);

  const userNameRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);

  const handleValidity = () => {
    let valid = null;

    if (
      userNameRef.current?.value.length == 0 ||
      userNameRef.current?.value == undefined
    ) {
      setUserNameErrorTxt("username is a required field");
      valid = false;
    } else if (userNameRef.current.value.length < 3) {
      setUserNameErrorTxt("username must be at least 3 cherchters");
      valid = false;
    } else if (userNameRef.current.value.length > 10) {
      setUserNameErrorTxt("username must be shorter then 10 cherchters");
      valid = false;
    }

    if (
      userPasswordRef.current?.value.length == 0 ||
      userPasswordRef.current?.value == undefined
    ) {
      setUserPasswordErrorTxt("password is a required field");
      valid = false;
    } else if (userPasswordRef.current.value.length < 8) {
      setUserPasswordErrorTxt("password must be at least 3 cherchters");
      valid = false;
    } else if (userPasswordRef.current.value.length > 15) {
      setUserPasswordErrorTxt("password must be shorter then 10 cherchters");
      valid = false;
    }
    console.log("valid", valid);

    if (valid == false) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidation(true);
    try {
      if (handleValidity()) {
        const loginReq = await LoginService({
          userName: userNameRef.current!.value,
          password: userPasswordRef.current!.value,
        });
        console.log(loginReq);
        document.cookie = `accsessToken=${
          loginReq.data?.accessToken
        }; path="/"; expires=${new Date(Date.now() + 900000)} `;
        navigate("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError) {
          console.error("there is an error", err);
        }
      }
    }
  };

  return (
    <Form
      noValidate
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      validated={validation}
      className="d-flex  justify-content-center w-75 p-4  rounded"
      style={{
        margin: "0 auto",
        flexDirection: "column",
        border: "1px solid black",
        backgroundColor: "rgb(189, 195, 199)",
      }}
    >
      <Row className="text-center">
        <span>Login</span>
      </Row>
      <Row>
        <Stack gap={3}>
          <Row>
            <Form.Group as={Col} controlId="userName">
              <Form.Label>User Name</Form.Label>
              <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  ref={userNameRef}
                  required
                  minLength={3}
                  maxLength={10}
                />
                <Form.Control.Feedback type="invalid">
                  {userNameErrorTxt || "please enter userName"}
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="password">
              <Form.Label>password</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  ref={userPasswordRef}
                  required
                  minLength={8}
                  maxLength={15}
                />
                <Form.Control.Feedback type="invalid">
                  {userPasswordErrorTxt || " please enter your password"}
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mx-5">
            <Button
              variant="primary"
              type="submit"
              className="w-75 align-items-center"
            >
              submit
            </Button>
          </Row>
        </Stack>
      </Row>
    </Form>
  );
}
