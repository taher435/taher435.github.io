class ArrayHelper
	
	attr_accessor :array
	
	def initialize(array)
		if array.is_a?(Array)
			@array = array
		else
			raise ArgumentError.new("Please provide a valid array input")
			#note: instead of raising error, we can silently try to convert the given input to array.
			#but that will be "too much intelligence" which is sometimes not good.
			#so letting the caller know that only array will be accepted
		end
	end
	
	#flattens the array given during initialization. Note the '!' mark.
	def flatten!
		@array = make_flat(@array)
	end
	
	#flattens the array given during initialization and gives back a new array
	def flatten
		make_flat(@array)
	end
	
	private
		def make_flat(value)
			result = []
			value.each do |element|
				if element.is_a?(Array)
					make_flat(element).each do |flatten_element|
						result << flatten_element
					end
				elsif element != nil
					result << element
				end
			end
			
			return result
		end
end