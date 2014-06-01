class UserDim < ActiveRecord::Base

  def self.user_distribute
    # select count(id),age,gender from user_dims group by age,gender
    # group(:time_dim_id).count(:id)
    select("count(id) as amount,age,gender").group("age,gender")
  end
end
