class UserLogFact < ActiveRecord::Base


  # 每個月的用戶量
  def self.activate_user_per_month
    group(:time_dim_id).count(:user_dim_id,distinct:true)
  end

  # 近12個月 指定行為的發生次數
  def self.action_by_month action
    action_dim_id=get_action_dim_id(action)
    select("sum(action_number) as action_amount,sum(user_dim_id) as user_count,time_dim_id").group(:time_dim_id).where(action_dim_id:action_dim_id)
    # .sum(:action_number).sum(:user_dim_id)
  end

  def self.get_action_dim_id action
    dic={}
    dic["post"]=1
    dic["tag"]=2
    dic["login"]=3
    dic["comment"]=4
    dic[action]
  end
end
