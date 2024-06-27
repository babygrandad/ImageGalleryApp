using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveFullNameFromImageModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8cf0cced-cd63-425a-99d8-54bbd8ea357a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d1201c6e-b93e-4652-828b-972897f3213d");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Images");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1ce9fcb5-5d42-46a8-b181-438809182953", null, "User", "USER" },
                    { "6a0213bb-1b13-4f0a-9712-d21965657d57", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1ce9fcb5-5d42-46a8-b181-438809182953");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a0213bb-1b13-4f0a-9712-d21965657d57");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Images",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8cf0cced-cd63-425a-99d8-54bbd8ea357a", null, "Admin", "ADMIN" },
                    { "d1201c6e-b93e-4652-828b-972897f3213d", null, "User", "USER" }
                });
        }
    }
}
