class ActionByMonthSerializer < ActiveModel::Serializer
  attributes :action_amount,:user_count,:date

  def date 
  	num=object.time_dim_id
    month=num%12
    month=12 if month==0
    year=(num-1)/12+2013
   return "#{year}.#{month}"
  end

end
