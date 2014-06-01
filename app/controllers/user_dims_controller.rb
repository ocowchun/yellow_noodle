class UserDimsController < ApplicationController
  def distribute
    user_distribute=UserDim.user_distribute

    respond_to do |format|
      format.json {     render json: user_distribute, each_serializer: UserDistributeSerializer,
                        root:"user_distribute"}
      format.csv { render text: signup_channel_to_csv(user_distribute) }
      format.any { render :text => "WTF" }
    end
  end

  private

  def signup_channel_to_csv data
    CSV.generate do |csv|
      csv << [:gender,:age,:amount]
      data.to_a.each do |obj|
        amount=obj.amount
        gender=obj.gender
        age=obj.age
        csv << [gender,age,amount]
      end
    end
  end
end
