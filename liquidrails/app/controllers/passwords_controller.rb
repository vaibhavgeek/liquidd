class PasswordsController < ApplicationController
	def forgot
		if params["user"]["email"].blank?
			return render json: {error: "User not found, please check email."}
		end

		user = User.find_by(email: params["user"]["email"])
		if user.present? 
			user.generate_password_token! 
			UserMailer.forgot_password(user).deliver_now
			render json: {message: "Password Reset Link sent to your email address"}, status: :ok 
		else
			render json: {message: "User not found, please check email."}, status: :not_found
		end
	end 

	def reset
		token = params["user"]["token"].to_s
		if params["user"]["token"].blank?
		 	return render json: {error: "Token not found"}
		end 

		user = User.find_by(reset_password_token: token)
		if user.present? && user.password_token_valid?
			if user.reset_password!(params["user"]["password"])
				render json: {message:" Password Reset"}, status: :ok
			else
				render json: {message: user.errors.full_messages}, status: :unprocessable_entity
			end
		else
			render json: {message: ['Link not valid or expired. Try Generating a new link']}, status: :not_found
		end

	end
end
