class ActivateUserPerMonthSerializer < ActiveModel::Serializer
  attributes :data

  def data
    result=[]
    object.to_a.each do|mau|
      el={}
      date=get_data(mau[0])
      el[:date]=date
      el[:amount]=mau[1]
      result.push(el)
    end
    result
  end

  def get_data num
    month=num%12
    month=12 if month==0
    year=(num-1)/12+2013
   return "#{year}.#{month}"
  end
end
