import { Authentication, RegisterUser } from "@/Services/UserRoutines";
import { User } from "../interfaceModels";

const handleAuthentication = async(
    Email: string,
    Password: string,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setShowAuthenticationFailed: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const authenticationdetails = {
        email: Email,
        password: Password
    }
    const authenticate = await Authentication(authenticationdetails);
    if(authenticate.success)
    {
        const user: User = {
            id: authenticate.user.id,
            email: authenticate.user.email,
            name:  authenticate.user.name,
            role:  authenticate.user.role,
        }
        setIsAuthenticated(true);
        return user;
    }
    else
    {
        setShowAuthenticationFailed(true);
    }
}

const handleRegister = async (
    Name: string,
    Email: string,
    Password: string,
    Role: string,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setShowAuthenticationFailed: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const Registerdetails = {
        name: Name,
        email: Email,
        password: Password,
        role: Role
    }
    const register = await RegisterUser(Registerdetails);
    if(register.success)
    {
        const user: User = {
            id: register.user.id,
            email: register.user.email,
            name:  register.user.name,
            role:  register.user.role,
        }
        setIsAuthenticated(true);
        return user;
    }
    else
    {
        setShowAuthenticationFailed(true);
    }
}