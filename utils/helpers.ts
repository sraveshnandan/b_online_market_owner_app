const calculatePercentage = (originalPrice: number, discountPrice: number) => {
    const discountAmount = originalPrice - discountPrice;

    const percent = discountAmount / originalPrice * 100

    return parseFloat(percent.toFixed(2))
}



const checkUserSubscription = async (token: string) => {
    try {
        console.log("checking user subscription ")
        const isPaidUser = await fetch(`http://192.168.1.125:8000/api/v1/check-subscription`, {
            headers: {
                token
            }
        })
        const apires = await isPaidUser.json();
        if (!apires.success) {
            return {
                success: false,
                message: apires.message
            }
        }

        return {
            success: true,
            transtaction: apires.transtaction
        }
    } catch (error: any) {
        return {
            success: false,
            mesage: error.mesage
        }
    }
}

const getOrderId = async (amount: number, userId: string) => {
    try {

        const payload = {
            amount,
            userId
        }

        const order = await fetch(`https://bom-api-1-0-1.onrender.com/api/v1/create-subscription`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const apiRes: any = await order.json();
        if (!apiRes.response) {
            return {
                success: false,
                message: "Server error occured."
            }
        }



        return {
            success: true,
            apiRes: apiRes.response
        }


    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}


const verifyPayment = async (token: string, body: any) => {
    try {

        const payload = {
            ...body
        }
        const paymentStatus = await fetch(`https://bom-api-1-0-1.onrender.com/api/v1/payment-verify`, {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        const paymentStatusRes = await paymentStatus.json();

        if (!paymentStatusRes.success) {
            return {
                success: false,
                message: paymentStatusRes.message
            }
        }


        return {
            success: true,
            message: "Your payment is confermed."
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}


export { calculatePercentage, checkUserSubscription, getOrderId, verifyPayment }