class UserMailer < ApplicationMailer

	def forgot_password(user)
				@user = user
				mail(to: user.email, subject: "Reset Password Link")
	end
end
