using api.DTOs.Like;
using api.Models;

namespace api.Mappers
{
	public static class LikeMapper
	{
		public static GetLikeDTO ToGetLikeDTO (this Like likeModel)
		{
			if (likeModel == null) return null;

			return new GetLikeDTO 
			{
				LikeID = likeModel.LikeID,
				ImageID = likeModel.ImageID,
			};
		}
	}
}