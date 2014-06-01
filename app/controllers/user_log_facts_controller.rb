class UserLogFactsController < ApplicationController

  def activate_user_per_month
    activate_user_per_month=UserLogFact.activate_user_per_month
    # binding.pry
    render json: activate_user_per_month, serializer: ActivateUserPerMonthSerializer
  end
end
