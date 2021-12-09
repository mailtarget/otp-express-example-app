# MTARGET OTP Example App

This is an example app to implement Email OTP authentication from MTARGET OTP

## Prerequisite
- you must have account in MTARGET OTP, https://otp.mtarget.co/
- create an page OTP implementation, view setting then you will find "api key" and "secret key" that will use in this application
- nodejs v14 installed in system

## Installation
- clone this repository
- copy file ".env.example" to ".env"
- edit ".env" set `MT_MAGIC_API_KEY` and `MT_MAGIC_SECRET_KEY` from your account
- run "npm install"
- run "npm run dev"
