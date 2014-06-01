class UserLogFact < ActiveRecord::Base


  # 每個月的用戶量
  def self.activate_user_per_month
    group(:time_dim_id).count(:user_dim_id,distinct:true)
  end

  # 近12個月 指定行為的發生次數
  def self.action_by_month
    group(:time_dim_id).where(action_dim_id:2).sum(:action_number)
  end
end
