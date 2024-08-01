using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CategorySingular : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImageCategories");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6522ea58-e521-4e1b-805d-1ac68fcd0231");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6ff2ea5c-b364-4dad-9a3d-bfa82fd7ac3a");

            migrationBuilder.RenameColumn(
                name: "DateCapturted",
                table: "Images",
                newName: "DateCaptured");

            migrationBuilder.AddColumn<int>(
                name: "CategoryID",
                table: "Images",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "05e972f3-2177-462d-a6cd-e8c7bb6d4cdb", null, "Admin", "ADMIN" },
                    { "cc28ede0-1b2f-435f-8540-a860c0b363fc", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_CategoryID",
                table: "Images",
                column: "CategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Categories_CategoryID",
                table: "Images",
                column: "CategoryID",
                principalTable: "Categories",
                principalColumn: "CategoryID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Categories_CategoryID",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_CategoryID",
                table: "Images");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "05e972f3-2177-462d-a6cd-e8c7bb6d4cdb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cc28ede0-1b2f-435f-8540-a860c0b363fc");

            migrationBuilder.DropColumn(
                name: "CategoryID",
                table: "Images");

            migrationBuilder.RenameColumn(
                name: "DateCaptured",
                table: "Images",
                newName: "DateCapturted");

            migrationBuilder.CreateTable(
                name: "ImageCategories",
                columns: table => new
                {
                    ImageCategoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryID = table.Column<int>(type: "int", nullable: false),
                    ImageID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageCategories", x => x.ImageCategoryID);
                    table.ForeignKey(
                        name: "FK_ImageCategories_Categories_CategoryID",
                        column: x => x.CategoryID,
                        principalTable: "Categories",
                        principalColumn: "CategoryID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImageCategories_Images_ImageID",
                        column: x => x.ImageID,
                        principalTable: "Images",
                        principalColumn: "ImageID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6522ea58-e521-4e1b-805d-1ac68fcd0231", null, "User", "USER" },
                    { "6ff2ea5c-b364-4dad-9a3d-bfa82fd7ac3a", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImageCategories_CategoryID",
                table: "ImageCategories",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_ImageCategories_ImageID",
                table: "ImageCategories",
                column: "ImageID");
        }
    }
}
