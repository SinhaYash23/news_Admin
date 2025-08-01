export const loginUser = async(credentials) => {
    const response = await fetch("",{
        method:"POST",
        headers:{
            "Content Type":"application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error("Login Failed");
    }
    return response.json();
}