import cv2

# Load the original image
image_path = "d:/Universidad/Programacion/cosas-de-Js/Website/9_imageSlider/image3.jpg"

image = cv2.imread(image_path)

# Resize the image to 1500x844
new_resolution = (1500, 844)
resized_image = cv2.resize(image, new_resolution)

# Save the resized image
output_path = "resized_image.jpg"
cv2.imwrite(output_path, resized_image)

print(f"Resized image saved at: {output_path}")
