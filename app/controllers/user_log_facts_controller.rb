class UserLogFactsController < ApplicationController

  def activate_user_per_month
    activate_user_per_month=UserLogFact.activate_user_per_month
    render json: activate_user_per_month, serializer: ActivateUserPerMonthSerializer
  end

  def action_by_month
    action=params[:user_action]
    action_by_month=UserLogFact.action_by_month(action)
    render json: action_by_month, each_serializer: ActionByMonthSerializer
  end
end
