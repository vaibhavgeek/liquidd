class ProductsController < ApplicationController
	def all_products
		products = Product.all.paginate(page: params[:page], per_page: 25)
		render json: {results: products, meta: pagination_meta(products)}
	end

	def search
		products = Product.search(params[:column],params[:search]).paginate(page: params[:page], per_page: 25)
		render json: {results: products, meta: pagination_meta(products)}
	end

	def product
		prod = Product.find_by(id: params["id"])
		if prod
			render json: {
				status: :ok,
				product: prod
			}
		else
			render json: {
				status: 401
			}
		end
	end

private
  def pagination_meta(object)
    {
      current_page: object.current_page,        
 	 
      total_results: object.total_entries,
      total_pages: object.total_pages
    }
  end

end
