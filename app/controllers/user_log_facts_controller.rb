require 'csv'
class UserLogFactsController < ApplicationController

  def activate_user_per_month
    activate_user_per_month=UserLogFact.activate_user_per_month
    respond_to do |format|
      format.js {   render json: activate_user_per_month, serializer: ActivateUserPerMonthSerializer}
      format.csv { render text: activate_user_per_month_to_csv(activate_user_per_month) }
      format.any { render :text => "WTF" }
    end
  end

  def action_by_month
    action=params[:user_action].downcase
    action_by_month=UserLogFact.action_by_month(action)
    respond_to do |format|
      format.json { render json: action_by_month, each_serializer: ActionByMonthSerializer,root:"action_by_month"}
      format.csv { render text: action_by_month_to_csv(action_by_month) }
      format.any { render :text => "WTF" }
    end
  end

  private

  def activate_user_per_month_to_csv data
    CSV.generate do |csv|
      csv << [:date,:amount]
      data.to_a.each do |obj|
        amount=obj[1]
        date=date(obj[0])
        csv << [date,amount]
      end
    end
  end

  def action_by_month_to_csv data
    CSV.generate do |csv|
      csv << [:date,:action_amount,:user_count,]
      data.each do |obj|
        action_amount=obj.action_amount
        user_count=obj.user_count
        date=date(obj.time_dim_id)
        csv << [date,action_amount,user_count]
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
