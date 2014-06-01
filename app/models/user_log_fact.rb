class UserLogFact < ActiveRecord::Base


  # 每個月的用戶量
  def self.activate_user_per_month
    group(:time_dim_id).count(:user_dim_id,distinct:true)
  end
end
