class Product < ApplicationRecord

def self.search(column,search)
	#unsafe search usede, risk of SQL injection!!!

  if search.kind_of?(String)
  	search = search.downcase
    Product.where('lower('+column+') LIKE :search', search: "%#{search.to_s}%")
  end
end


end
