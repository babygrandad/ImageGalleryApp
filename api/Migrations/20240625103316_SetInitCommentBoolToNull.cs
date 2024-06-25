using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class SetInitCommentBoolToNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "423b7255-a98a-4376-ab4b-69158b0c57c6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "795a890e-1e39-4a36-b3c2-a0e8a5204da8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8cf0cced-cd63-425a-99d8-54bbd8ea357a", null, "Admin", "ADMIN" },
                    { "d1201c6e-b93e-4652-828b-972897f3213d", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8cf0cced-cd63-425a-99d8-54bbd8ea357a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d1201c6e-b93e-4652-828b-972897f3213d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "423b7255-a98a-4376-ab4b-69158b0c57c6", null, "Admin", "ADMIN" },
                    { "795a890e-1e39-4a36-b3c2-a0e8a5204da8", null, "User", "USER" }
                });
        }
    }
}
