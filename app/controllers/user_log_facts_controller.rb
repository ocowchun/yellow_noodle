require 'csv'
class UserLogFactsController < ApplicationController

  def activate_user_per_month
    activate_user_per_month=UserLogFact.activate_user_per_month
    render json: activate_user_per_month, serializer: ActivateUserPerMonthSerializer
  end

  def action_by_month
    action=params[:user_action]
    action_by_month=UserLogFact.action_by_month(action)
    respond_to do |format|
      format.js { render json: action_by_month, each_serializer: ActionByMonthSerializer}
      format.csv { render text: action_by_month_to_csv(action_by_month) }
      format.any { render :text => "WTF" }
    end
  end

  private

  def action_by_month_to_csv data
    CSV.generate do |csv|
      csv << [:action_amount,:user_count,:time_dim_id]
      data.each do |obj|
        action_amount=obj.action_amount
        user_count=obj.user_count
        date=date(obj.time_dim_id)
        csv << [action_amount,user_count,date]
      end
    end
  end

  def date time_dim_id
    month=time_dim_id%12
    month=12 if month==0
    year=(time_dim_id-1)/12+2013
   return "#{year}.#{month}"
  end
end
